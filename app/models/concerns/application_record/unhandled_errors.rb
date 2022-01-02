# frozen_string_literal: true

class ApplicationRecord::UnhandledErrors < ActiveRecord::ActiveRecordError
  attr_reader :record

  def initialize(record = nil)
    if record
      @record = record
      errors = @record.unhandled_errors.map(&:full_message).join(', ')
      message = I18n.t(
        :"#{@record.class.i18n_scope}.errors.messages.record_invalid",
        errors: errors,
        default: :'errors.messages.record_invalid'
      )
    else
      message = 'Unhandled errors'
    end

    super(message)
  end
end
