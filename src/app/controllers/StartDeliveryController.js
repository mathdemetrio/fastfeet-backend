import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO, getHours } from 'date-fns';
import Delivery from '../models/Delivery';

class StartDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman: Yup.number()
        .positive()
        .required(),
      delivery: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const { start_date } = req.body;

    /**
     * check if hour is between 08 and 18
     */
    const hourOfDate = getHours(parseISO(start_date));

    if (hourOfDate < 8 || hourOfDate >= 18) {
      return res
        .status(400)
        .json({ error: 'Start hour must be between 08:00 and 17:59' });
    }

    /**
     * check if deliveries limit was reached
     */
    const dayStart = startOfDay(parseISO(start_date));
    const dayEnd = endOfDay(parseISO(start_date));

    const { delivery: delivery_id, deliveryman: deliveryman_id } = req.params;

    const deliveriesOnDay = await Delivery.findAll({
      where: {
        id: req.params.delivery,
        deliveryman_id: req.params.deliveryman,
        start_date: {
          [Op.between]: [dayStart, dayEnd],
        },
      },
    });

    if (deliveriesOnDay.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Deliveries start limit was reached to deliveryman.' });
    }

    const deliveryUpdated = await Delivery.update(
      { start_date },
      {
        returning: true,
        where: {
          id: delivery_id,
          deliveryman_id,
        },
      }
    );

    if (deliveryUpdated[0] === 0) {
      return res
        .status(400)
        .json({ error: 'Delivery with deliveryman not found.' });
    }

    return res.json(deliveryUpdated[1][0]);
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().positive(),
    });

    if (!(await schema.isValid({ ...req.params }))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    if (req.query.delivered) {
      return res.json(
        await Delivery.findAll({
          where: {
            deliveryman_id: req.params.id,
            signature_id: {
              [Op.ne]: null,
            },
          },
        })
      );
    }
    return res.json(
      await Delivery.findAll({
        where: {
          deliveryman_id: req.params.id,
          signature_id: {
            [Op.eq]: null,
          },
        },
      })
    );
  }
}

export default new StartDeliveryController();
