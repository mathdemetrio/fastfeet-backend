import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';
import Delivery from '../models/Delivery';

class FinalizeDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman: Yup.number()
        .positive()
        .required(),
      delivery: Yup.number()
        .positive()
        .required(),
      end_date: Yup.date().when('start_date', (start_date, field) =>
        !start_date ? field.required() : field
      ),
      signature_id: Yup.number()
        .positive()
        .when('end_date', (end_date, field) =>
          end_date ? field.required() : field
        ),
    });

    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const { end_date, signature_id } = req.body;
    const { delivery: delivery_id, deliveryman: deliveryman_id } = req.params;

    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
      },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Delivery with deliveryman not found.' });
    }

    if (delivery.end_date || delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been completed.' });
    }

    if (isBefore(parseISO(end_date), delivery.start_date)) {
      return res
        .status(400)
        .json({ error: 'End date must be before the start date.' });
    }

    return res.json(await delivery.update({ end_date, signature_id }));
  }
}

export default new FinalizeDeliveryController();
