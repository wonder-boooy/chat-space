json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.content @message.content
json.image_url @message.image_url
