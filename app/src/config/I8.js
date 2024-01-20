import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			"upload_count": "Uploads",
			"destroy_button": "Destroy & Delete Session",
			"upload_error_title": "Operation Cancelled",
			"upload_error_text": "Image Already Exists",
			"upload_new": "Upload Image",
			"home_header": "Dashboard",
			"loading_text": "Please Wait",
			"loading_describe":"Don't Close or Leave this page even if it seems unresponsive",
			"info_years_old":"Years",
			"info_face_detected":"Faces Detected",
			"info_header":"What AI sees in This Image",
			"login":"Go Anonymously",
			"welcome": "Welcome to DeBlurify",
			"welcome_describe":"We care about your privacy. We do not collect any data from you, so you do not have to do anything to start using the app, Just Click Go Anonymously and enjoy!",
			"welcome_terms":"By clicking Go Anonymously, you agree to our Terms of Service and Privacy Policy."
		},
	},
	ar: {
		translation: {
			"upload_count": "صورة",
			"destroy_button": "تدمير وحذف الجلسة",
			"upload_error_title": "تم إلغاء العملية",
			"upload_error_text": "الصورة موجودة بالفعل",
			"upload_new": "رفع صورة جديدة",
			"home_header": "لوحة التحكم",
			"loading_describe":"متقفلش الصفحة ولا تروح منها حتى لو بتبان غير مستجيبة",
			"loading_text": "برجاء الانتظار",
			"info_header":"ما الذي يراه الذكاء الاصطناعي في هذه الصورة؟",
			"info_face_detected":"وجه مكتشف",
			"info_years_old":"سنة",
			"login":"تسجيل الدخول بشكل خفى",
			"welcome_terms":"بمجرد ما تدوس تسجيل الدخول فأنت موافق على شروط الخدمة وسياسة الخصوصية",
			"welcome": "اهلا بيك! انت في ديبلوريفاي",
			"welcome_describe":"إحنا يهمنا الخصوصية بتاعتك وعارفين إن ممكن متكونش حابب تشارك معلوماتك، عشان كدا احنا مش طالبين منك أى حاجه دوس بس على تسجيل دخول خفي وابدء الاستخدام"
		},
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
