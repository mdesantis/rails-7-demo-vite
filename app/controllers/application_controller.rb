# frozen_string_literal: true

class ApplicationController < ActionController::Base
  add_flash_types :success

  layout 'hello_react', only: %i[hello_react hello_react_2]

  def hello_react
  end

  def hello_react_2
  end
end
