import { useState } from 'react'
import './SearchInterface.css'

interface GoogleDork {
  id: string
  name: string
  value: string
  description: string
}

const PREDEFINED_DORKS: GoogleDork[] = [
  { id: 'site', name: 'Specific Site', value: 'site:', description: 'Search within a specific site' },
  { id: 'filetype', name: 'File Type', value: 'filetype:', description: 'Search for a file type (pdf, doc, etc.)' },
  { id: 'intitle', name: 'In Title', value: 'intitle:', description: 'Words in the page title' },
  { id: 'inurl', name: 'In URL', value: 'inurl:', description: 'Words in the URL' },
  { id: 'intext', name: 'In Text', value: 'intext:', description: 'Words in the page content' },
  { id: 'cache', name: 'Cache', value: 'cache:', description: 'View cached version' },
  { id: 'link', name: 'Links', value: 'link:', description: 'Pages that contain links to' },
  { id: 'related', name: 'Related Sites', value: 'related:', description: 'Sites similar to' },
  { id: 'info', name: 'Information', value: 'info:', description: 'Information about a URL' },
  { id: 'define', name: 'Definition', value: 'define:', description: 'Definition of a term' },
]

function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDorks, setSelectedDorks] = useState<Array<{ id: string; value: string; customValue?: string }>>([])
  const [showDorkOptions, setShowDorkOptions] = useState(false)
  const [customDork, setCustomDork] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleAddDork = (dork: GoogleDork) => {
    if (!selectedDorks.find(d => d.id === dork.id)) {
      setSelectedDorks([...selectedDorks, { id: dork.id, value: dork.value }])
    }
    setShowDorkOptions(false)
  }

  const handleRemoveDork = (id: string) => {
    setSelectedDorks(selectedDorks.filter(d => d.id !== id))
  }

  const handleAddCustomDork = () => {
    if (customDork.trim()) {
      const customId = `custom-${Date.now()}`
      setSelectedDorks([...selectedDorks, { id: customId, value: customDork.trim(), customValue: customDork.trim() }])
      setCustomDork('')
      setShowCustomInput(false)
    }
  }

  const handleUpdateDorkValue = (id: string, newValue: string) => {
    setSelectedDorks(selectedDorks.map(d => 
      d.id === id ? { ...d, customValue: newValue } : d
    ))
  }

  const buildSearchUrl = () => {
    let query = searchQuery
    const dorkParts: string[] = []
    
    selectedDorks.forEach(dork => {
      const dorkValue = dork.customValue || ''
      if (dorkValue.trim()) {
        dorkParts.push(`${dork.value}${dorkValue}`)
      }
    })
    
    if (dorkParts.length > 0) {
      query = `${dorkParts.join(' ')} ${query}`.trim()
    }
    
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`
  }

  const handleSearch = () => {
    if (searchQuery.trim() || selectedDorks.length > 0) {
      window.open(buildSearchUrl(), '_blank')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <h1 className="app-title">EasySearch</h1>
        <p className="app-subtitle">Advanced search with Google Dorks</p>
        
        <div className="search-box">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Your search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {searchQuery && (
              <button 
                className="clear-button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={!searchQuery.trim() && selectedDorks.length === 0}
          >
            Search
          </button>
        </div>

        {selectedDorks.length > 0 && (
          <div className="dorks-list">
            {selectedDorks.map((dork) => {
              const predefinedDork = PREDEFINED_DORKS.find(d => d.id === dork.id)
              return (
                <div key={dork.id} className="dork-item">
                  <div className="dork-label">
                    <span className="dork-name">{predefinedDork?.name || 'Custom'}</span>
                    <span className="dork-operator">{dork.value.split(':')[0]}:</span>
                  </div>
                  <input
                    type="text"
                    className="dork-value-input"
                    placeholder={predefinedDork?.description || 'Custom value'}
                    value={dork.customValue || ''}
                    onChange={(e) => handleUpdateDorkValue(dork.id, e.target.value)}
                  />
                  <button 
                    className="remove-dork-button"
                    onClick={() => handleRemoveDork(dork.id)}
                    aria-label="Remove"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <div className="dork-actions">
          <button 
            className="add-dork-button"
            onClick={() => {
              setShowDorkOptions(!showDorkOptions)
              setShowCustomInput(false)
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Option
          </button>
          
          {showDorkOptions && (
            <>
              <div 
                className="dork-options-overlay"
                onClick={() => {
                  setShowDorkOptions(false)
                  setShowCustomInput(false)
                }}
              />
              <div className="dork-options-panel">
              <div className="dork-options-grid">
                {PREDEFINED_DORKS
                  .filter(dork => !selectedDorks.find(sd => sd.id === dork.id))
                  .map((dork) => (
                    <button
                      key={dork.id}
                      className="dork-option-button"
                      onClick={() => handleAddDork(dork)}
                    >
                      <div className="dork-option-name">{dork.name}</div>
                      <div className="dork-option-desc">{dork.description}</div>
                      <div className="dork-option-value">{dork.value}</div>
                    </button>
                  ))}
              </div>
              
              <div className="custom-dork-section">
                {!showCustomInput ? (
                  <button
                    className="custom-dork-button"
                    onClick={() => setShowCustomInput(true)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Custom Option
                  </button>
                ) : (
                  <div className="custom-dork-input-wrapper">
                    <input
                      type="text"
                      className="custom-dork-input"
                      placeholder="Ex: site:example.com"
                      value={customDork}
                      onChange={(e) => setCustomDork(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomDork()}
                    />
                    <button 
                      className="add-custom-button"
                      onClick={handleAddCustomDork}
                      disabled={!customDork.trim()}
                    >
                      Add
                    </button>
                    <button 
                      className="cancel-custom-button"
                      onClick={() => {
                        setShowCustomInput(false)
                        setCustomDork('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            </>
          )}
        </div>
        
        <div className="footer-credit">
          <p>Made with <span className="heart">♥</span> by <strong>Kamil B.</strong></p>
        </div>
      </div>
    </div>
  )
}

export default SearchInterface

