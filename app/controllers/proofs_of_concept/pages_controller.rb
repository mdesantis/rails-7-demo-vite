# frozen_string_literal: true

class ProofsOfConcept::PagesController < ProofsOfConceptController
  before_action :set_pages, only: %i[index]
  before_action :set_page, only: %i[show edit update destroy]
  before_action :set_new_page, only: %i[new]
  before_action :set_props, only: %i[index show new edit]

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    @page = Page.new(page_params)

    if @page.save
      redirect_to proofs_of_concept_page_path(@page), notice: 'Page was successfully created.'
    else
      @props = render_to_string :new, formats: :json
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @page.update(page_params)
      redirect_to proofs_of_concept_page_path(@page), notice: 'Page was successfully updated.'
    else
      @props = render_to_string :edit, formats: :json
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @page.destroy
    redirect_to proofs_of_concept_pages_path, notice: 'Page was successfully destroyed.'
  end

  private

  def set_pages
    @pages = Page.all
  end

  def set_page
    @page = Page.find(params[:id])
  end

  def set_new_page
    @page = Page.new
  end

  def set_props
    @props = render_to_string formats: :json
  end

  def page_params
    params.require(:page).permit(:author, :content)
  end
end
