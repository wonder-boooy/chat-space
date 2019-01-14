class UsersController < ApplicationController

  def edit
    @user = User.find_by(id: current_user.id)
  end

  def update
    if current_user.update(permit_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    @users = User.where('name LIKE(?)',"%#{params[:keyword]}%").filter_current_user(current_user)
    respond_to do |format|
      format.json
    end
  end

  private
  def permit_params
    params.require(:user).permit(:name, :email)
  end


end
