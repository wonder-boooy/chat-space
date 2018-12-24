# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

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
|group_id|integer|null: false, foreign_key: ture|

### Association
- has_many :messages
- has_many :groups, through: :members


## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
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
