class User < ApplicationRecord
    has_secure_password

    has_many :workouts, dependent: :destroy
    has_many :exercises, through: :workouts

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
