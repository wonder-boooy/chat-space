# DB設計

## membersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|password|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members


## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :users, througn: :members


## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text|null: false|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
