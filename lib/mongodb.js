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
  // Campos básicos de identidad
  nombre: { type: String, required: true },
  apellido: String,
  ci: String, // Cédula de identidad
  sexo: { type: String, enum: ['masculino', 'femenino', 'otro'] },
  edad: Number,
  
  // Información de contacto
  email: { type: String, required: true },
  telefono: String,
  direccion: String,
  
  // Fechas importantes
  fechaNacimiento: Date,
  fechaIngreso: { type: Date, default: Date.now },
  
  // Información laboral
  puesto: String,
  cargo: String,
  agencia: String, // Simplificado como String para compatibilidad
  salario: Number,
  
  // Información adicional
  antecedentes: String,
  cargosAnteriores: String,
  recomendaciones: String,
  
  // Estado
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
  empleado: String, // Simplificado como String para mejor compatibilidad
  fecha: { type: Date, required: true },
  horaEntrada: String,
  horaSalida: String,
  estado: { type: String, enum: ['presente', 'ausente', 'tardanza'], default: 'presente' },
  observaciones: String
}, { timestamps: true });

const desempenoSchema = new mongoose.Schema({
  empleado: String, // Simplificado como String para mejor compatibilidad
  periodo: String,
  puntuacion: Number,
  
  // Campos específicos de evaluación
  puntualidad: { type: Number, min: 1, max: 5 },
  proactividad: { type: Number, min: 1, max: 5 },
  calidadServicio: { type: Number, min: 1, max: 5 },
  
  // Metas tradicionales (mantener compatibilidad)
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
  empleado: String, // Simplificado como String para mejor compatibilidad
  fecha: Date,
  tipo: { type: String, enum: ['positiva', 'correctiva'], default: 'positiva' }, // Actualizar según frontend
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
