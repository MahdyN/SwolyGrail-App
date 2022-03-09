class Workout < ApplicationRecord
  belongs_to :user
  belongs_to :exercise

  validates :day, presence: true
  validates :sets, numericality: { greater_than_or_equal_to: 1}
  validates :reps, numericality: { greater_than_or_equal_to: 1}
end
