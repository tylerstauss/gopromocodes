class User < ActiveRecord::Base
  validates_presence_of :email, :username
  validates_uniqueness_of :email
  # validates_format_of :username, :without => /\A\d/
  validates :username, format: { with: /[\A\w\z\s\.\-\_]+/,
    message: "username can only have letters and numbers" }
  has_secure_password validations: false

  include BCrypt

  def password
    return nil if self.password_digest.nil?
    @password ||= Password.new(password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end

  def authenticate(password)
    if self.password == password
      return true
    else
      return false
    end
  end 

  def self.create_from_google(user_params)
    p user_params
    p "%" * 50
    @user = User.new(user_params)
    p @user
    if @user.save!
        redirect_to(user_path(@user))
      else
        redirect_to(new_user_path)
      end
  end

   def self.search(term, page)
    if term
      where('name LIKE ?', "%#{term}%").paginate(page: page, per_page: 50).order('name ASC')
    else
      paginate(page: page, per_page: 50).order('name ASC') 
    end
  end
end