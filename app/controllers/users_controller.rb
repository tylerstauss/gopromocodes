class UsersController < ApplicationController

	def index
		authenticate_admin!
		@users = User.all
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		@user = User.new
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def create
		@user = User.new(user_params)
		if verify_recaptcha && @user.save
	  	redirect_to(user_path(@user))
	  else
	  	redirect_to(new_user_path)
	  end

	  
	end

	def show
		@user = User.find(params[:id])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def edit
		authenticate_admin!
		@user = User.find(params[:id])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		user = User.find(params[:id])
    user.update!(user_params)
    redirect_to user
	end

	def delete
	end

private
  def user_params
    params.require(:user).permit(:username, :email, :admin, :password)
  end
	
end