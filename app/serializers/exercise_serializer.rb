class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :group, :name, :description, :form
end
