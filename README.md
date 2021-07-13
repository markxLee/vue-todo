# vue app: todo list
For the team to learn about vue.

- Mọi người sẽ tự tạo 1 branch theo tên hoặc nickname của mình sau đó init 1 project vue.
- Nội dung công việc: mọi người sẽ tạo todo list bằng vue.js cụ thể như sau:
  - Có 1 giao diện input text để nhập nội dung task
  - List todo để thể hiện các task đã nhập, phía trước có check box để select chọn task
  - Sau khi check vào task sẽ show ra các icon hoặc dropdown menu phía sau để: remove task, done task (khi chọn done task sẽ gạch ngang task và disable không cho un-check), pin task (task nào được pin sẽ nhảy lên trên cùng, bên dưới những task đã pin trước đó), Unpin nếu task trước đó đã pin.
- Nâng cao:
  - Sử dụng thư viện UI Material Design Framework (vuetify)
  - Sử dụng localStorage để lưu trạng thái của todo-list, khi tắt trình duyệt mở lại không bị mất dữ liệu
  - ... Không giới hạn các technical sữ dụng

# nuxt-ts-app

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
