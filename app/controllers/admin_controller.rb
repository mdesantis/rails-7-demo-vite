# frozen_string_literal: true

class AdminController < ApplicationController
  include AdminController::SetPageTitleConcern

  layout 'admin'
end
