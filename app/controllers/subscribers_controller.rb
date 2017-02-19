class SubscribersController < ApplicationController

	def index
		authenticate_admin!
		@subscriber = Subscriber.new
		@subscribers = Subscriber.all
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def create

		@subscriber = Subscriber.new(subscriber_params)
	  @subscriber.save
	  @categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)

	 respond_to do |format|
	    if @subscriber.save
	      format.js   { p "via JS "}
	    else
	      redirect_to root_path
	    end
	  end
	end

	def show
		authenticate_admin!
		@subscriber = Subscriber.new
		@subscriber = Subscriber.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def edit
		authenticate_admin!
		@subscriber = Subscriber.new
		@subscriber = Subscriber.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		subscriber = Subscriber.find(params[:id])
    subscriber.update!(subscriber_params)
    redirect_to subscriber
	end

	def delete
	end

private
  def subscriber_params
    params.require(:subscriber).permit(:email, :active)
  end
	
end