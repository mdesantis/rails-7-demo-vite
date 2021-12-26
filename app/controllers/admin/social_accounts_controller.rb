# frozen_string_literal: true

class Admin::SocialAccountsController < AdminController
  before_action :set_social_accounts, only: %i[index new]
  before_action :set_social_account, only: %i[show edit update destroy]
  before_action :set_new_social_account, only: %i[index new]
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
    @social_account = SocialAccount.new(social_account_params)

    if @social_account.save
      redirect_to admin_social_accounts_path, success: 'Social Account was successfully created.'
    else
      set_social_accounts
      @props = render_to_string :new, formats: :json
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @social_account.update(social_account_params)
      redirect_to @social_account, notice: 'Social Account was successfully updated.'
    else
      @props = render_to_string :edit, formats: :json
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @social_account.destroy
    redirect_to admin_social_accounts_path, success: 'Social Account was successfully destroyed.'
  end

  private

  def set_social_accounts
    @social_accounts = SocialAccount.all.order(updated_at: :desc)
  end

  def set_social_account
    @social_account = SocialAccount.find(params[:id])
  end

  def set_new_social_account
    @social_account = SocialAccount::Facebook.new
  end

  def set_props
    @props = render_to_string formats: :json
  end

  def social_account_params
    params
      .require(:social_account)
      .permit(
        :name,
        :type,
        :app_id,
        :app_secret,
        handled_errors: [
          :type,
          :attribute
        ]
      )
  end
end
