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
    @users = User.where('name LIKE(?)',"%#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def permit_params
    params.require(:user).permit(:name, :email)
  end


end
