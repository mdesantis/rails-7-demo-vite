# frozen_string_literal: true

class SocialAccount < ApplicationRecord
  TYPES = %w[SocialAccount::Facebook].freeze

  enum :type, TYPES.index_by(&:to_sym), scopes: false

  validates :name, :type, presence: true
end
