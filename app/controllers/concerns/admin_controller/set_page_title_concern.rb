# frozen_string_literal: true

module AdminController::SetPageTitleConcern
  extend ActiveSupport::Concern

  DEFAULT_PAGE_TITLE = 'Rails 7 Demo Vite'

  included do
    before_action :set_page_title
    helper_method :page_title
  end

  private

  def page_title
    return DEFAULT_PAGE_TITLE if @page_title.blank?

    Array.wrap(@page_title).push(DEFAULT_PAGE_TITLE).join(' ‹ ')
  end

  def infer_model_class_from_controller_name
    controller_name.classify.constantize
  rescue NameError
    nil
  end

  def infer_fragments_from_class_name
    breadcrumbs = self.class.to_s.split('::')
    breadcrumbs.pop
    breadcrumbs.reverse!
    breadcrumbs.map! { |v| v.underscore.titleize }
  end

  def fetch_model_class
    return unless (model_class = infer_model_class_from_controller_name)

    unless model_class.respond_to?(:model_name)
      raise "Found candidate model class but it does not seem to be a model. Model class: #{model_class.inspect}"
    end

    model_class
  end

  def fetch_model_name_fragment(model_class: nil, flavour: :element)
    model_class = fetch_model_class if model_class.nil?

    model_name = model_class.model_name

    model_name.send(flavour).humanize.split.map(&:capitalize).join(' ')
  end

  def set_page_title_for_index_action
    model_class = fetch_model_class

    return unless (model_name_fragment = fetch_model_name_fragment(model_class: model_class, flavour: :collection))

    model_name = model_class.model_name

    @page_title = [
      model_name.singular == model_name.collection ? "#{model_name_fragment} Listing" : model_name_fragment,
      *infer_fragments_from_class_name
    ]
  end

  def set_page_title_for_new_action
    return unless (model_name_fragment = fetch_model_name_fragment)

    @page_title = ["New #{model_name_fragment}", *infer_fragments_from_class_name]
  end

  def set_page_title_for_show_action
    return unless (model_name_fragment = fetch_model_name_fragment)

    @page_title = ["Show #{model_name_fragment}", *infer_fragments_from_class_name]
  end

  def set_page_title_for_edit_action
    return unless (model_name_fragment = fetch_model_name_fragment)

    @page_title = ["Edit #{model_name_fragment}", *infer_fragments_from_class_name]
  end

  def set_page_title
    case action_name
    when 'index' then set_page_title_for_index_action
    when 'new' then set_page_title_for_new_action
    when 'show' then set_page_title_for_show_action
    when 'edit' then set_page_title_for_edit_action
    end
  end
end
