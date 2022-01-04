# frozen_string_literal: true

class ApplicationController < ActionController::Base
  add_flash_types :success

  before_action :handle_latency

  helper_method :server_context

  private

  def handle_latency
    sleep session[:latency] if session[:latency]&.positive?

    return unless (latency = params[:latency])

    latency = latency.to_f

    session[:latency] = latency
  end

  def server_context
    {
      currentURL: request.original_url,
      'i18n.defaultLocale': I18n.default_locale,
      'i18n.locale': I18n.locale,
      'rails.env': Rails.env
    }
  end
end
