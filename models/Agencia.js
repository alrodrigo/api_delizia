import mongoose from 'mongoose';

const agenciaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  gerente: {
    type: String,
    required: [true, 'El gerente es requerido'],
    trim: true
  },
  activa: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
agenciaSchema.index({ nombre: 1 });
agenciaSchema.index({ activa: 1 });

// Virtual para ID string
agenciaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Eliminar __v del output
agenciaSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  }
});

const Agencia = mongoose.models.Agencia || mongoose.model('Agencia', agenciaSchema);

export default Agencia;
