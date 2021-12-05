export const BASE = 'https://shifttosmart.in/stsapi/teacher-api'
export const PATH = 'https://shifttosmart.in/'

// export const BASE = 'http://192.168.64.3/stsapi/teacher-api.php'
// export const PATH = 'http://192.168.64.3/'

export async function presentAlert(alertController, head, msg) {
  const alert = await alertController.create({
    header: head,
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

export async function presentAlertConfirm(alertController, head, msg, cb) {
  const alert = await alertController.create({
    header: head,
    message: msg,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'Yes',
        handler: cb
      }
    ]
  });

  await alert.present();
}
