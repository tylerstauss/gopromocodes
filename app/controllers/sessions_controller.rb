class SessionsController < ApplicationController
  def new
  	@user = User.new
    @subscriber = Subscriber.new
    @categories = Category.order('name ASC')
    @top_stores = Store.where(top_store: true).limit(12)
  end

  def create
    @user = User.find_by_email(params[:session][:email].downcase)
  	if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash.now[:error] = 'Invalid email/password combination'
      @user = User.new
      render 'new'
    end
    @subscriber = Subscriber.new
    @categories = Category.order('name ASC')
    @top_stores = Store.where(top_store: true).limit(12)
  end

  def destroy
    @subscriber = Subscriber.new
    @categories = Category.order('name ASC')
    @top_stores = Store.where(top_store: true).limit(12)
    session.clear
    redirect_to root_path
  end
end