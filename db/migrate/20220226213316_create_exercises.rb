class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :group
      t.string :name
      t.text :description
      t.string :form

      t.timestamps
    end
  end
end
