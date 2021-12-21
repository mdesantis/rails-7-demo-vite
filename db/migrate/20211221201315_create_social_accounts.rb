# frozen_string_literal: true

class CreateSocialAccounts < ActiveRecord::Migration[7.0]
  def change
    create_enum :social_accounts_type, %w[SocialAccount::Facebook]

    create_table :social_accounts do |t|
      t.string :name, null: false
      t.enum :type, enum_type: :social_accounts_type, null: false
      t.jsonb :credentials

      t.timestamps
    end
  end
end
