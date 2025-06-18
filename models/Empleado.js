import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true
  },
  cargo: {
    type: String,
    required: [true, 'El cargo es requerido'],
    trim: true
  },
  agencia: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agencia',
      required: true
    },
    nombre: {
      type: String,
      required: true
    }
  },
  fechaIngreso: {
    type: Date,
    required: [true, 'La fecha de ingreso es requerida'],
    default: Date.now
  },
  salario: {
    type: Number,
    required: [true, 'El salario es requerido'],
    min: [0, 'El salario no puede ser negativo']
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para mejorar performance
empleadoSchema.index({ email: 1 });
empleadoSchema.index({ 'agencia._id': 1 });
empleadoSchema.index({ activo: 1 });

// Virtual para ID string
empleadoSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Eliminar __v del output
empleadoSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  }
});

const Empleado = mongoose.models.Empleado || mongoose.model('Empleado', empleadoSchema);

export default Empleado;
