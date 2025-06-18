import mongoose from 'mongoose';

// Configuración de conexión a MongoDB
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/delizia';
    
    // Asegurar que el string incluya la base de datos
    const finalUri = mongoUri.includes('/delizia') ? mongoUri : mongoUri.replace('/?', '/delizia?');
    
    console.log('🔍 Intentando conectar a MongoDB...');
    await mongoose.connect(finalUri);
    isConnected = true;
    console.log('✅ MongoDB conectado correctamente a:', finalUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
};

// Esquemas de Mongoose
const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  cargo: String,
  agencia: {
    _id: String,
    nombre: String
  },
  fechaIngreso: { type: Date, default: Date.now },
  salario: Number,
  activo: { type: Boolean, default: true }
}, { timestamps: true });

const agenciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: String,
  telefono: String,
  email: String,
  gerente: String,
  activa: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
}, { timestamps: true });

const asistenciaSchema = new mongoose.Schema({
  empleado: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
    nombre: String
  },
  fecha: { type: Date, required: true },
  horaEntrada: String,
  horaSalida: String,
  estado: { type: String, enum: ['presente', 'ausente', 'tardanza'], default: 'presente' },
  observaciones: String
}, { timestamps: true });

const desempenoSchema = new mongoose.Schema({
  empleado: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
    nombre: String
  },
  periodo: String,
  puntuacion: Number,
  metas: {
    ventas: Number,
    atencionCliente: Number,
    puntualidad: Number,
    trabajoEquipo: Number
  },
  observaciones: String,
  fechaEvaluacion: Date,
  evaluador: String
}, { timestamps: true });

const observacionSchema = new mongoose.Schema({
  empleado: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
    nombre: String
  },
  fecha: Date,
  tipo: { type: String, enum: ['positiva', 'negativa', 'neutra'], default: 'neutra' },
  categoria: String,
  descripcion: String,
  observador: String,
  fechaCreacion: { type: Date, default: Date.now }
}, { timestamps: true });

// Exportar modelos
export const Empleado = mongoose.models.Empleado || mongoose.model('Empleado', empleadoSchema);
export const Agencia = mongoose.models.Agencia || mongoose.model('Agencia', agenciaSchema);
export const Asistencia = mongoose.models.Asistencia || mongoose.model('Asistencia', asistenciaSchema);
export const Desempeno = mongoose.models.Desempeno || mongoose.model('Desempeno', desempenoSchema);
export const Observacion = mongoose.models.Observacion || mongoose.model('Observacion', observacionSchema);
