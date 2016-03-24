class MessagesController < ApplicationController
  
  skip_before_action :verify_authenticity_token
  
  def new
  	 @message = Message.new
  end

  def create
     @message = Message.new(message_params)


    if @message.valid?
      MessageMailer.new_message(@message).deliver_now

     redirect_to '#home'
    else
      flash[:alert] = "An error occurred while delivering this message."

      # render :new
    end
  end

  private

    def message_params
      params.require(:message).permit(:name, :email, :content)
    end

end
