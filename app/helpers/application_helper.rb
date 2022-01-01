# frozen_string_literal: true

module ApplicationHelper
  def render_json(*args, &block)
    options = args.extract_options!

    options.merge! formats: [:json], handlers: [:jbuilder]

    partial = args.pop

    options.merge! partial: partial if partial

    args.push options

    render(*args, &block)
  end
end
