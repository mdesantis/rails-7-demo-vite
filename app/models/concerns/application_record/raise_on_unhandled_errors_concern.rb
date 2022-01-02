# frozen_string_literal: true

module ApplicationRecord::RaiseOnUnhandledErrorsConcern
  extend ActiveSupport::Concern

  included do
    attr_reader :handled_errors
  end

  def save(*args, **options, &block)
    saved = super

    return saved if saved

    raise_on_unhandled_errors

    saved
  end

  def handled_errors=(errors)
    initialize_handled_errors

    errors.each do |error|
      error = error.with_indifferent_access

      @handled_errors.add error[:attribute].to_sym, error[:type].to_sym
    end
  end

  def any_unhandled_error?
    errors.any? { |error| unhandled_error? error }
  end

  def unhandled_errors
    errors.select { |error| unhandled_error? error }
  end

  private

  def initialize_handled_errors
    @handled_errors = ActiveModel::Errors.new(self)
  end

  def unhandled_error?(error)
    return false unless handled_errors_set?

    !handled_errors.added? error.attribute, error.type
  end

  def handled_errors_set?
    instance_variable_defined? :@handled_errors
  end

  def raise_on_unhandled_errors
    return unless handled_errors_set?

    raise_unhandled_errors if any_unhandled_error?
  end

  def raise_unhandled_errors
    raise(ApplicationRecord::UnhandledErrors.new(self)) # rubocop:disable Style/RaiseArgs
  end
end
