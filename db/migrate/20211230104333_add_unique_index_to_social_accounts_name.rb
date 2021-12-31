# frozen_string_literal: true

class AddUniqueIndexToSocialAccountsName < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_index :social_accounts, :name, unique: true, algorithm: :concurrently
  end
end
