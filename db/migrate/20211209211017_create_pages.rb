# frozen_string_literal: true

class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :pages do |t|
      t.string :author
      t.text :content

      t.timestamps
    end
  end
end
