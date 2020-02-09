import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

class ProblematicDeliveriesController {
  async index(req, res) {
    const queryConfig = {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id', 'description'],
          where: {
            delivery_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
    };

    return res.json(await Delivery.findAll(queryConfig));
  }

  async delete(req, res) {
    const problem = await DeliveryProblem.findByPk(req.params.problemId);

    if (!problem) {
      res.status(400).json({ error: 'Delivery problem not found.' });
    }

    const deliveryList = await Delivery.update(
      { canceled_at: new Date() },
      {
        returning: true,
        where: { id: problem.delivery_id },
      }
    );

    const delivery = deliveryList[1][0]; // sequelize update() returns a list of deliverires
    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);

    await Queue.add(CancelDeliveryMail.key, {
      delivery,
      deliveryman,
    });

    return res.json({
      message: `Delivery ${delivery.id} cancelled with success`,
    });
  }
}

export default new ProblematicDeliveriesController();
