import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_street: Yup.string().required(),
      address_number: Yup.string().required(),
      address_complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    return res.json(await Recipient.findAll());
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' });
    }

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      zip_code: Yup.string(),
      address_street: Yup.string().when('zip_code', (zip_code, field) =>
        zip_code ? field.required() : field
      ),
      address_number: Yup.string().when('zip_code', (zip_code, field) =>
        zip_code ? field.required() : field
      ),
      address_complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string().when('state', (zip_code, field) =>
        zip_code ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' });
    }
    await recipient.update(req.body);
    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' });
    }
    return res.json({ success: 'Recipient deleted' });
  }
}

export default new RecipientController();
