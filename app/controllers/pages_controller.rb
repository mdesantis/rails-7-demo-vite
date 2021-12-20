# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :set_page, only: %i[show edit update destroy]

  def index
    @pages = Page.all
    set_props
  end

  def show
    set_props
  end

  def new
    @page = Page.new
    set_props
  end

  def edit
    set_props
  end

  def create
    @page = Page.new(page_params)

    if @page.save
      redirect_to @page, notice: 'Page was successfully created.'
    else
      @props = render_to_string :new, formats: :json
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @page.update(page_params)
      redirect_to @page, notice: 'Page was successfully updated.'
    else
      @props = render_to_string :edit, formats: :json
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @page.destroy
    redirect_to pages_url, notice: 'Page was successfully destroyed.'
  end

  private

  def set_page
    @page = Page.find(params[:id])
  end

  def set_props
    @props = render_to_string formats: :json
  end

  def page_params
    params.require(:page).permit(:author, :content)
  end
end
