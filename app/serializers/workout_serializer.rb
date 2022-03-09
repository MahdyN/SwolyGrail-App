class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :day, :sets, :reps
  has_one :exercise
end
