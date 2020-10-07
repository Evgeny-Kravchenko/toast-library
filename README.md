# toast-library

This is a toast library. You can easily create notifications using this library.

To use this package you have to create file .npmrc and put following stuff in it:

    registry=https://npm.pkg.github.com/evgeny-kravchenko

Then you have to install this package and import toastManager service and ToastContainer component.

    npm install @evgeny-kravchenko/toast-library@1.1.0

    import { toastManager, ToastContainer } from '@evgeny-kravchenko/toast-library';

You can create a custom theme of toast or you can use preset themes of toasts.

| Method of toastManager toastManager service | Description                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------                        |
| setType(type)                               | Here you can pass string 'error', 'info', 'warning' or 'success'. The toast type depends on the type you choose. For instance: toastManager.setType('success')                        |
| setAnimation(animation)                     | Here you can pass animation name. There are three animations: 'puff', 'slide' and 'swing'. For instance: toastManager.setAnimation('puff');                                           |
| setTitle(title)                             | Here you can pass any title of your notification. For instance: toastManager.setTitle('Everything is good')                                                                           |
| setDescription(description)                 | Here you can type description of your notification. For instance: toastManager.setDescription('Everything is good and I am very glad for it.')                                        |
| setColorOfBackground(color)                 | Here you can pass background color of your notification. You can do it in different types such as hex, rgb, rgba and so on. For instance toastManager.setColorOfBackground('#ff00ff') |
| setPosition(x, y) | Here you can set the position of your notification. First parameter is horizontal position. Here you can pass 'left' or 'right'. The second parameter is vertical position. Here you can pass 'top' or 'bottom' |
| setShowingDuration(ms) | Here you can pass the time in milliseconds after which your notification will disappear. For instance: toastManager.setShowingDuration(3000)                                                               | 
| setIndent(x, y) | Here you can pass indents from the window in pixels. The first parameter is horizontal indent, the second parameter is vertical indent. For instance: toastManager.setIndents(10, 10)                             |
| show() | You can show the notification with the help of this method. For instance: toastManager.show()                                                                                                                              |
| hide() | You can hide all notification with the help of this method. For instance: toastManager.hide()                                                                                                                              |

You can chain almost all methods except show() and hide().

For instance:

    toastManager
      .setPosition('right', 'top')
      .setType('info')
      .setTitle('It is very important information')
      .setDescription(
        'It is very important information and I think it is very important that you know about it.'
      )
      .setIndent(5, 5)
      .setColorOfBackground('rgba(0, 0, 0, 0.5)')
      .setAnimation('puff')
      .show();
      
It is possible to show up to three toasts at the same time.

    toastManager
          .setPosition('left', 'bottom')
          .setType('error')
          .setTitle('Something went wrong')
          .setDescription(
            'Something went wrong. You have to fix it.'
          )
          .setIndent(10, 10)
          .setColorOfBackground('#ff00ff')
          .setAnimation('slide')
          .show();
          
        toastManager
            .setPosition('right', 'top')
            .setType('info')
            .setTitle('It is very important information')
            .setDescription(
              'It is very important information and I think it is very important that you know about it.'
            )
            .setIndent(5, 5)
            .setColorOfBackground('rgba(0, 0, 0, 0.5)')
            .setAnimation('puff')
            .show();
