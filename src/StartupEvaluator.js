import React, { useState } from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  CheckCircle, 
  XCircle, 
  Loader, 
  MessageSquare, 
  Brain, 
  LightbulbOff, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft 
} from 'lucide-react';

// Analyzer App Component (separate from landing page)
const AnalyzerApp = ({ onBackToLanding }) => {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo analysis function for testing without n8n
  const generateDemoAnalysis = (ideaText) => {
    return {
      summary: `Your startup idea focuses on ${ideaText.toLowerCase().includes('ai') ? 'leveraging AI technology' : 'solving a common problem'} in an innovative way. The concept shows potential for addressing real user needs with a scalable solution.`,
      market_potential: "The target market shows strong growth potential with increasing demand for digital solutions. Competition exists but there's room for differentiation through unique features and user experience. Early adoption could be driven by tech-savvy users before expanding to mainstream markets.",
      key_risks: "Main challenges include user acquisition costs, market saturation, technical complexity, and potential regulatory hurdles. User retention and monetization strategy will be critical for long-term success. Data privacy and security concerns may impact user trust.",
      suggestions: "Focus on building an MVP with core features first. Conduct thorough market research and user interviews. Consider partnerships with established players. Implement strong data security measures. Develop a clear monetization strategy that aligns with user value.",
      final_verdict: "Promising idea with potential - Needs validation and refinement",
      validation_strategy: "Create a landing page to gauge interest, conduct user surveys, build a simple prototype for testing, reach out to potential early adopters, and analyze competitor responses to similar solutions."
    };
  };

  const analyzeIdea = async () => {
    if (!idea.trim()) {
      setError('Please describe your startup idea');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const demoAnalysis = generateDemoAnalysis(idea);
        setAnalysis(demoAnalysis);
      } catch (err) {
        setError('Failed to analyze your idea. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const getVerdictColor = (verdict) => {
    const v = verdict?.toLowerCase() || '';
    if (v.includes('promising')) return 'text-green-700 bg-green-50 border-green-200';
    if (v.includes('needs work')) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getVerdictIcon = (verdict) => {
    const v = verdict?.toLowerCase() || '';
    if (v.includes('promising')) return React.createElement(CheckCircle, { className: "w-6 h-6 text-green-600" });
    if (v.includes('needs work')) return React.createElement(AlertTriangle, { className: "w-6 h-6 text-yellow-600" });
    return React.createElement(XCircle, { className: "w-6 h-6 text-red-600" });
  };

  const demoIdeas = [
    "AI-powered meal planning app that generates personalized ingredient lists and recipes for healthier living.",
    "A platform that connects remote workers with local co-working spaces for day passes",
    "Smart home device that monitors air quality and automatically adjusts HVAC settings"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Header */}
      <nav className="bg-white py-4 shadow-sm border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToLanding}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:block">Back to Home</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="text-xl font-bold text-gray-800">Startup Evaluator</div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {!analysis ? (
          <>
            {/* Input Section */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Analyze Your Startup Idea
              </h1>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                Get instant AI-powered insights on market potential, risks, and validation strategies
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
              {/* Demo Ideas */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Try a sample idea:</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  {demoIdeas.map((demoIdea, index) => (
                    <button
                      key={index}
                      onClick={() => setIdea(demoIdea)}
                      className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors duration-200 border border-blue-200 text-left sm:text-center"
                    >
                      {demoIdea.length > 60 ? `${demoIdea.substring(0, 60)}...` : demoIdea}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Input */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="idea-input" className="block text-lg font-semibold text-gray-700 mb-3">
                    Describe your startup idea:
                  </label>
                  <textarea
                    id="idea-input"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., An app that uses AI to help people find the perfect pet based on their lifestyle, living situation, and preferences..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    rows={window.innerWidth < 768 ? 4 : 6}
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Be as detailed as possible. Include target audience, key features, and what problem you're solving.
                  </p>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={analyzeIdea}
                    disabled={loading || !idea.trim()}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 md:px-12 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <Loader className="w-6 h-6 animate-spin" />
                        <span>Analyzing Your Idea...</span>
                      </div>
                    ) : (
                      'Get AI Analysis →'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Analysis Results */
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-10">
              Your Idea's Deep Dive Analysis
            </h1>
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Summary</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{analysis.summary}</p>
              </div>

              {/* Market Potential */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Market Potential</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{analysis.market_potential}</p>
              </div>

              {/* Key Risks */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Key Risks</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{analysis.key_risks}</p>
              </div>

              {/* Suggestions */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Suggestions for Improvement</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{analysis.suggestions}</p>
              </div>

              {/* Validation Strategy */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <LightbulbOff className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Validation Strategy</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{analysis.validation_strategy}</p>
              </div>

              {/* Final Verdict */}
              <div className={`rounded-xl p-4 md:p-6 border-2 ${getVerdictColor(analysis.final_verdict)} shadow-md text-center`}>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {getVerdictIcon(analysis.final_verdict)}
                  <h3 className="text-xl md:text-2xl font-bold">Final Verdict</h3>
                </div>
                <p className="font-extrabold text-lg md:text-xl lg:text-2xl">{analysis.final_verdict}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-10">
                <button
                  onClick={() => {
                    setIdea('');
                    setAnalysis(null);
                    setError('');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 md:px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md transform hover:scale-105"
                >
                  Analyze Another Idea
                </button>
                <button
                  onClick={onBackToLanding}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 md:px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md transform hover:scale-105"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ onGetStarted }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Startup Evaluator</div>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Validate Your Startup Idea{' '}
            <span className="text-blue-600 block md:inline">in Seconds</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-10 px-4">
            Get instant AI-powered insights on market potential, risks, and validation strategies. Built for founders, students, who move fast.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg transform hover:scale-105"
          >
            Evaluate Your Idea →
          </button>
          <p className="text-sm text-gray-500 mt-3">Free • No signup required • 30-second analysis</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 md:mb-12">How It Works</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 px-4">
            Get professional-grade startup validation in three simple steps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Describe Your Idea</h3>
              <p className="text-gray-600 text-sm md:text-base">Share your startup concept in plain English. No pitch deck required.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Brain className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm md:text-base">Our AI evaluates market potential, competition, and identifies key risks instantly.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Target className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Get Actionable Insights</h3>
              <p className="text-gray-600 text-sm md:text-base">Receive a comprehensive report with validation steps and next actions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Analysis Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">Sample Analysis</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 px-4">
            See what kind of insights you'll receive for your startup idea
          </p>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6 mb-6 md:mb-8 text-left">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3">Startup idea:</h3>
            <p className="text-gray-600 text-sm md:text-base">
              "AI-powered meal planning app that generates personalized ingredient lists and recipes based on dietary preferences and available ingredients."
            </p>
          </div>

          {/* Sample Analysis Accordion */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Market Potential */}
            <div className="border-b border-gray-100 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-4 md:p-5 text-base md:text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSection('market_potential')}
              >
                <span>✨ Market Potential</span>
                {openSection === 'market_potential' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openSection === 'market_potential' && (
                <div className="p-4 md:p-5 pt-0 text-gray-600 text-left text-sm md:text-base">
                  <p>The target market shows strong growth potential with increasing demand for digital solutions. Competition exists but there's room for differentiation through unique features and user experience. Early adoption could be driven by tech-savvy users before expanding to mainstream markets.</p>
                </div>
              )}
            </div>

            {/* Key Risks */}
            <div className="border-b border-gray-100 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-4 md:p-5 text-base md:text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSection('key_risks')}
              >
                <span>⚠️ Key Risks</span>
                {openSection === 'key_risks' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openSection === 'key_risks' && (
                <div className="p-4 md:p-5 pt-0 text-gray-600 text-left text-sm md:text-base">
                  <p>Main challenges include user acquisition costs, market saturation, technical complexity, and potential regulatory hurdles. User retention and monetization strategy will be critical for long-term success.</p>
                </div>
              )}
            </div>

            {/* Improvement Suggestions */}
            <div className="border-b border-gray-100 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-4 md:p-5 text-base md:text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSection('suggestions')}
              >
                <span>💡 Improvement Suggestions</span>
                {openSection === 'suggestions' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openSection === 'suggestions' && (
                <div className="p-4 md:p-5 pt-0 text-gray-600 text-left text-sm md:text-base">
                  <p>Focus on building an MVP with core features first. Conduct thorough market research and user interviews. Consider partnerships with established players. Implement strong data security measures.</p>
                </div>
              )}
            </div>

            {/* Validation Strategy */}
            <div className="border-b border-gray-100 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-4 md:p-5 text-base md:text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSection('validation_strategy')}
              >
                <span>🎯 Validation Strategy</span>
                {openSection === 'validation_strategy' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openSection === 'validation_strategy' && (
                <div className="p-4 md:p-5 pt-0 text-gray-600 text-left text-sm md:text-base">
                  <p>Create a landing page to gauge interest, conduct user surveys, build a simple prototype for testing, reach out to potential early adopters, and analyze competitor responses to similar solutions.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Try It With Your Data
            </button>
          </div>
        </div>
      </section>

      {/* Trusted by Founders Worldwide Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">Trusted by Founders Worldwide</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 px-4">
            Join thousands of entrepreneurs who've validated their ideas with AI
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-600 mb-2">2,500+</span>
              <p className="text-gray-600 text-base md:text-lg">Ideas Evaluated</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-600 mb-2">&lt; 30s</span>
              <p className="text-gray-600 text-base md:text-lg">Average Analysis Time</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-600 mb-2">4.8/5</span>
              <p className="text-gray-600 text-base md:text-lg">User Rating</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl italic text-gray-700 mb-4 md:mb-6">
              "Startup Evaluator helped me identify critical blind spots in my idea before I spent months building. The AI insights were surprisingly accurate and actionable."
            </p>
            <p className="font-semibold text-gray-800 text-sm md:text-base">
              - Sarah Chen, <span className="text-blue-600">Founder, TechFlow</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">Ready to Validate Your Idea?</h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 opacity-90 px-4">
            Stop guessing. Get data-driven insights that help you build something people actually want.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-700 py-3 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
          >
            Start Free Analysis →
          </button>
          <p className="text-sm mt-3 opacity-80">No credit card required • Results in seconds • Privacy guaranteed</p>
        </div>
      </section>
    </div>
  );
};

// Main App Component with Navigation
const StartupEvaluator = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'app'

  const navigateToApp = () => setCurrentView('app');
  const navigateToLanding = () => setCurrentView('landing');

  return (
    <div>
      {currentView === 'landing' ? (
        <LandingPage onGetStarted={navigateToApp} />
      ) : (
        <AnalyzerApp onBackToLanding={navigateToLanding} />
      )}
    </div>
  );
};

export default StartupEvaluator;