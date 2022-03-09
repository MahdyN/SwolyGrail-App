class Exercise < ApplicationRecord
    has_many :workouts
    has_many :users, through: :workouts
end
