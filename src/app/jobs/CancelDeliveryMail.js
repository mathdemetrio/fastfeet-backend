import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Entrega cancelada - ID: ${delivery.id}`,
      template: 'cancel_delivery',
      context: {
        deliveryman: deliveryman.name,
        id: delivery.id,
        product: delivery.product,
      },
    });
  }
}

export default new CancelDeliveryMail();
