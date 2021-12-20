# frozen_string_literal: true

class Page < ApplicationRecord
  validates :author, :content, presence: true
end
