# frozen_string_literal: true

class ApplicationController < ActionController::Base
  add_flash_types :success

  layout 'hello_react', only: %i[hello_react hello_react_2]

  before_action :handle_latency

  def hello_react
  end

  def hello_react_2
  end

  private

  def handle_latency
    sleep session[:latency] if session[:latency]&.positive?

    return unless (latency = params[:latency])

    latency = latency.to_f

    session[:latency] = latency
  end
end
