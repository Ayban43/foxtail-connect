import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import supabase from '../../config/supabaseClient';
import logo from '../../assets/logo.png'
import loginVector from '../../assets/login-vector.png'

const Login = ({ setIsAdmin, isAdmin }) => {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '', password: ''
  })

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

    } catch (error) {
      alert(error)
    } finally {
      setIsAdmin(isAdmin)
      navigate("/")
      setIsLoading(false)

    }
  }

  return (
    // <section className="bg-gray-200 dark:bg-gray-900 grid grid-cols-2 ml-10 mr-10">
    //   <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
    //     <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
    //       <img className="w-8 h-8 mr-2" src={logo} alt="logo"></img>
    //       Foxtail Connect
    //     </a>
    //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //           Sign in to your account
    //         </h1>
    //         <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
    //           <div>
    //             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    //             <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required="">
    //             </input>
    //           </div>
    //           <div>
    //             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    //             <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    //             </input>
    //           </div>
    //           {isLoading ? <LoadingSpinner /> : <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
    //           }
    //           <hr></hr>
    //           <div className="flex text-sm font-light text-gray-500 dark:text-gray-400 justify-center gap-1">
    //             <svg width={12} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M11,9h2a1,1,0,0,1,1,1,1,1,0,0,0,2,0,3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v4a3,3,0,0,0,3,3h2a3,3,0,0,0,3-3,1,1,0,0,0-2,0,1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V10A1,1,0,0,1,11,9Zm1-7A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" /></svg> 2023 <a href="https://foxtailfinancial.com/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Foxtail Financial</a>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="g-6 flex h-full flex-wrap items-center justify-center bg-white">
    //     <div
    //       className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
    //       <img
    //         src={loginVector}
    //         className="w-full"
    //         alt="Sample image" />
    //     </div>
    //   </div>
    // </section>

    <section class="bg-white">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section
          class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
        >
          <img
            alt="Night"
            src={loginVector}
            class="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div class="hidden lg:relative lg:block lg:p-12">
            {/* <a class="block text-white" href="/">
              <span class="sr-only">Home</span>
              <svg
                class="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a> */}

            {/* <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Squid 🦑
            </h2> */}

            {/* <p class="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
              dolorum aliquam, quibusdam aperiam voluptatum.
            </p> */}
          </div>
        </section>

        <main
          aria-label="Main"
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div class="w-full">
            <div class="relative -mt-16 block lg:hidden">
              <a
                class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span class="sr-only">Home</span>
                <img src={logo}></img>
              </a>

              <h1
                class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
              >
                Foxtail Connect
              </h1>

              <p class="mt-4 leading-relaxed text-gray-500">
                QUALITY SERVICE FOR QUALITY BUSINESSES
              </p>
            </div>

            <div className="w-full">
              <span className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src={logo} alt="logo"></img>
                Foxtail Connect
              </span>
              <div className="w-full rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-slate-50">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required="">
                      </input>
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      </input>
                    </div>
                    {isLoading ? <LoadingSpinner /> : <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    }
                    <hr></hr>
                    <div className="flex text-sm font-light text-gray-500 dark:text-gray-400 justify-center gap-1">
                      <svg width={12} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M11,9h2a1,1,0,0,1,1,1,1,1,0,0,0,2,0,3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v4a3,3,0,0,0,3,3h2a3,3,0,0,0,3-3,1,1,0,0,0-2,0,1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V10A1,1,0,0,1,11,9Zm1-7A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" /></svg> 2023 <a href="https://foxtailfinancial.com/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Foxtail Financial</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </section>


  )
}

export default Login