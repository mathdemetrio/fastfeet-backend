import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryId: Yup.number()
        .positive()
        .required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: req.params.deliveryId,
      description: req.body.description,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      deliveryId: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.deliveryId, {
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id', 'description'],
        },
      ],
    });

    const deliveryProblems = delivery.problems;

    return res.json(deliveryProblems);
  }
}

export default new ProblemController();
