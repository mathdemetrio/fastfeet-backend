import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova remessa disponivel para entrega.',
      template: 'new_delivery',
      context: {
        deliveryman: deliveryman.name,
        id: delivery.id,
        product: delivery.product,
        address_street: recipient.address_street,
        address_number: recipient.address_number,
        zip_code: recipient.zip_code,
      },
    });
  }
}

export default new NewDeliveryMail();
