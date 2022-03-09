class WorkoutsController < ApplicationController

    before_action :workout_auth

    def index
        user = User.find_by(id: session[:user_id])
        workouts = user.workouts
        render json: workouts, status: :ok
    end

    def create
        user = User.find_by(id: session[:user_id])
        workout = user.workouts.create(workout_params)

        if workout.valid?
            render json: workout, status: :created
        else
            render json: {errors: workout.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        workout = Workout.find_by(id: params[:id])
        workout.update(workout_params)

        if workout.valid?
            render json: workout, status: :accepted
        else 
            render json: {errors: workout.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        workout = Workout.find_by(id: params[:id])
        workout.destroy
        head :no_content
    end

private

    def workout_auth
        return render json: {error: "Please Sign-Up or Log-in to Access This Feature"}, status: :unauthorized unless session.include? :user_id
    end

    def workout_params
        params.permit(:day, :sets, :reps, :exercise_id)
    end

end
