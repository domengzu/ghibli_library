class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.string :ghibli_movie_id, null: false
      t.text :body, null: false
      t.timestamps
    end

    add_index :comments, :ghibli_movie_id
  end
end
