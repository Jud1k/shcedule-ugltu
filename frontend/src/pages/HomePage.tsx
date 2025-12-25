import { Link } from 'react-router';
import { 
  FaCalendarAlt, 
  FaUserCog, 
  FaSyncAlt, 
  FaUserGraduate,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';
import { 
  MdPeople
} from 'react-icons/md';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-20"></div>
              <FaUserGraduate className="relative w-24 h-24 text-blue-600 mx-auto" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Расписание{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              УГЛТУ
            </span>
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Удобный доступ к актуальному расписанию занятий. Всегда в курсе изменений и обновлений.
            Наш сервис поможет вам планировать учебный день эффективно.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: <FaCalendarAlt className="w-8 h-8" />,
              title: "Просмотр расписания",
              description: "Расписание для всех групп и преподавателей",
              color: "from-blue-500 to-cyan-500",
              link: "/schedule"
            },
            {
              icon: <FaUserCog className="w-8 h-8" />,
              title: "Управление",
              description: "Панель администратора для управления",
              color: "from-purple-500 to-pink-500",
              link: "/admin"
            },
          ].map((feature, index) => (
            <div
              key={index}
            >
              <Link
                to={feature.link}
                className="block h-full rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-transparent"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Перейти
                  <FaArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {[
            {
              icon: <FaSyncAlt className="w-8 h-8 text-blue-500" />,
              title: "Актуальность",
              description: "Автоматическое обновление расписания"
            },
            {
              icon: <MdPeople className="w-8 h-8 text-green-500" />,
              title: "Доступность",
              description: "Для всех студентов и преподавателей"
            },
            {
              icon: <FaCheckCircle className="w-8 h-8 text-purple-500" />,
              title: "Надежность",
              description: "Стабильная работа сервиса"
            }
          ].map((benefit, index) => (
            <div key={index} className="backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex p-3 rounded-lg bg-gray-50 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {benefit.title}
              </h3>
              <p>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}