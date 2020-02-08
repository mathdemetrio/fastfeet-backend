import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

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

    const delivery = await Delivery.update(
      { canceled_at: new Date() },
      {
        returning: true,
        where: { id: problem.delivery_id },
      }
    );

    return res.json(delivery);
  }
}

export default new ProblematicDeliveriesController();
