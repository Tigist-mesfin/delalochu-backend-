#!/bin/bash

echo "🚀 Creating Delalaye backend structure..."

# ROOT
mkdir -p delalaye && cd delalaye

touch index.js README.md

# SRC CORE
mkdir -p src
touch src/app.js src/server.js

# CONFIG
mkdir -p src/config
touch src/config/db.js src/config/env.js src/config/logger.js

# SHARED
mkdir -p src/shared/{helpers,utils,middlewares,errors}

touch src/shared/helpers/logger.helper.js
touch src/shared/helpers/pagination.helper.js
touch src/shared/helpers/response.helper.js

touch src/shared/middlewares/auth.middleware.js
touch src/shared/middlewares/error.middleware.js
touch src/shared/middlewares/role.middleware.js

# DATABASE
mkdir -p src/database/{models,migrations,seeders}
touch src/database/models/index.js
touch src/database/associations.js
touch src/database/connection.js

# MODELS CORE
mkdir -p src/database/models/core
touch src/database/models/core/user.model.js
touch src/database/models/core/brokerProfile.model.js
touch src/database/models/core/brokerReview.model.js
touch src/database/models/core/clientProfile.model.js
touch src/database/models/core/staffProfile.model.js
touch src/database/models/core/staffRole.model.js
touch src/database/models/core/staffPermission.model.js

# MODELS COMMERCE
mkdir -p src/database/models/commerce
touch src/database/models/commerce/deal.model.js
touch src/database/models/commerce/dealAuditTrail.model.js
touch src/database/models/commerce/listing.model.js
touch src/database/models/commerce/listingCategory.model.js
touch src/database/models/commerce/seekerOrder.model.js

# MODELS COMMUNICATION
mkdir -p src/database/models/communication
touch src/database/models/communication/notification.model.js
touch src/database/models/communication/smsMessages.model.js

# MODELS FINANCIAL
mkdir -p src/database/models/financial
touch src/database/models/financial/transaction.model.js
touch src/database/models/financial/commissionHistory.model.js
touch src/database/models/financial/revenue.model.js
touch src/database/models/financial/subscriptionHistory.model.js
touch src/database/models/financial/subscriptionSetting.model.js

# MODULES
mkdir -p src/modules

# CORE MODULES
mkdir -p src/modules/core/user
touch src/modules/core/user/user.controller.js
touch src/modules/core/user/user.service.js
touch src/modules/core/user/user.repository.js
touch src/modules/core/user/user.router.js
touch src/modules/core/user/user.validation.js

mkdir -p src/modules/core/broker
touch src/modules/core/broker/broker.controller.js
touch src/modules/core/broker/broker.service.js
touch src/modules/core/broker/broker.repository.js
touch src/modules/core/broker/broker.router.js
touch src/modules/core/broker/broker.validation.js

mkdir -p src/modules/core/client
touch src/modules/core/client/client.controller.js
touch src/modules/core/client/client.service.js
touch src/modules/core/client/client.repository.js
touch src/modules/core/client/client.router.js
touch src/modules/core/client/client.validation.js

mkdir -p src/modules/core/staff
touch src/modules/core/staff/staff.controller.js
touch src/modules/core/staff/staff.service.js
touch src/modules/core/staff/staff.repository.js
touch src/modules/core/staff/staff.router.js
touch src/modules/core/staff/staff.validation.js

# COMMERCE
mkdir -p src/modules/commerce/deal
touch src/modules/commerce/deal/deal.controller.js
touch src/modules/commerce/deal/deal.service.js
touch src/modules/commerce/deal/deal.repository.js
touch src/modules/commerce/deal/deal.router.js
touch src/modules/commerce/deal/deal.validation.js

mkdir -p src/modules/commerce/listing
touch src/modules/commerce/listing/listing.controller.js
touch src/modules/commerce/listing/listing.service.js
touch src/modules/commerce/listing/listing.repository.js
touch src/modules/commerce/listing/listing.router.js
touch src/modules/commerce/listing/listing.validation.js

mkdir -p src/modules/commerce/order
touch src/modules/commerce/order/order.controller.js
touch src/modules/commerce/order/order.service.js
touch src/modules/commerce/order/order.repository.js
touch src/modules/commerce/order/order.router.js
touch src/modules/commerce/order/order.validation.js

# COMMUNICATION
mkdir -p src/modules/communication/notification
touch src/modules/communication/notification/notification.controller.js
touch src/modules/communication/notification/notification.service.js
touch src/modules/communication/notification/notification.router.js
touch src/modules/communication/notification/notification.validation.js

mkdir -p src/modules/communication/sms
touch src/modules/communication/sms/sms.controller.js
touch src/modules/communication/sms/sms.service.js
touch src/modules/communication/sms/sms.router.js
touch src/modules/communication/sms/sms.validation.js

# FINANCIAL
mkdir -p src/modules/financial/transaction
touch src/modules/financial/transaction/transaction.controller.js
touch src/modules/financial/transaction/transaction.service.js
touch src/modules/financial/transaction/transaction.repository.js
touch src/modules/financial/transaction/transaction.router.js
touch src/modules/financial/transaction/transaction.validation.js

mkdir -p src/modules/financial/subscription
touch src/modules/financial/subscription/subscription.controller.js
touch src/modules/financial/subscription/subscription.service.js
touch src/modules/financial/subscription/subscription.repository.js
touch src/modules/financial/subscription/subscription.router.js
touch src/modules/financial/subscription/subscription.validation.js

# ANALYTICS
mkdir -p src/modules/analytics
touch src/modules/analytics/analytics.controller.js
touch src/modules/analytics/analytics.service.js
touch src/modules/analytics/analytics.router.js
touch src/modules/analytics/analytics.validation.js

echo "✅ Structure created successfully!"